"use client";
import { saveLinks } from "@/actions/Link.action";
import Empty from "@/components/Empty";
import Link from "@/components/Link";
import Preview from "@/components/Preview";
import { PreviewContext } from "@/Context/PreviewContext";
import { LinkType } from "@/types/types";
import { linkSchema } from "@/utils/validation"; // Ensure this imports the correct linkSchema
import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useContext, useState } from "react";
import { useFormState } from "react-dom";
// @ts-expect-error could not find type declarations for uuid
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

// Define the interface for links


const Links = () => {
    const [links, setLinks] = useState<LinkType[]>([]);
    const { openPreview } = useContext(PreviewContext);
    const [linkErrors, setLinkErrors] = useState<{ id: string; errors: z.ZodIssue[] }[]>([]);

    const addLink = () => {
        const newLink: LinkType = {
            id: uuidv4(),
            platform: "",
            url: "",
        };
        setLinks([...links, newLink]);
        setLinkErrors([...linkErrors, { id: newLink.id, errors: [] }]);
    };

    const removeLink = (id: string) => {
        setLinks(links.filter((link) => link.id !== id));
    };

    const updateLink = (id: string, newData: Partial<LinkType>) => {
        setLinks(links.map((link) => (link.id === id ? { ...link, ...newData } : link)));
    };

    

    const getLinkPosition = (id: string) => links.findIndex((link) => link.id === id);
    const handleSubmit = async () => {
      const validationErrors: { id: string; errors: z.ZodIssue[] }[] = [];

      // Validate each link using the Zod schema
      links?.forEach((link) => {
          try {
              linkSchema.parse(link); // Will throw an error if the link is invalid
          } catch (error) {
              if (error instanceof z.ZodError) {
                  validationErrors.push({
                      id: link.id,
                      errors: error.errors,
                  });
              }
          }
      });

      // Update link errors state
      setLinkErrors(validationErrors);

      if (validationErrors.length > 0) {
          console.error("Validation errors:", validationErrors);
      } else {
          await saveLinks(links)
      }
  };

    const handleDragEnd = (e:DragEndEvent) => {
        const { active, over } = e;
        if (!over || active.id === over.id) {
            return;
        }
        if (active.id === over.id) {
            return;
        }
        setLinks((links) => {
            const originalPos = getLinkPosition(active.id.toString());
            const newPos = getLinkPosition(over.id.toString());
            return arrayMove(links, originalPos, newPos);
        });
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );
    
    return (
        <div className="p-4 md:p-6 md:pt-0 lg:flex lg:gap-6 ">
            <div className={`w-full lg:w-[44%] rounded-xl bg-white lg:flex items-center justify-center ${openPreview ? "flex" : "hidden lg:block"}`}>
                <Preview links={links.slice(0, 5)} />
            </div>
            <div className={`lg:w-[56%] ${openPreview ? 'hidden lg:block' : 'block'}`}>
                <div className="p-6 md:p-10 flex flex-col gap-10 bg-white rounded-t-xl">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[24px] md:text-heading-md font-extrabold text-heading">
                            Customize your links
                        </h1>
                        <p className="text-[16px] text-paragraph">
                            Add/edit/remove links below and then share all your profiles with the world!
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <button onClick={addLink} className="hover:bg-hover w-full flex flex-col items-center px-[27px] py-[11px] outline outline-1 outline-accent rounded-lg">
                            <p className="text-[16px] font-semibold text-accent">
                                + Add new link
                            </p>
                        </button>
                        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                            <SortableContext items={links} strategy={verticalListSortingStrategy}>
                                {links.length > 0 ? (links.map((link, index) => {
                                    const error = linkErrors.find(err => err.id === link.id);
                                    return (
                                        <Link
                                            id={link.id}
                                            key={link.id}
                                            num={index + 1}
                                            updateLink={updateLink}
                                            removeLink={removeLink}
                                            //@ts-expect-error error would always have a length
                                            hasError={error?.errors?.length > 0} 
                                            errmessage={error ? error.errors.map(e => e.message).join(", ") : ""}
                                        />
                                    );
                                })) : <Empty />}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
                <hr />
                <div className="p-4 md:p-6 md:px-10 flex md:justify-end bg-white rounded-b-xl">
                    <button onClick={handleSubmit}
                        disabled={links.length === 0}
                        className="disabled:bg-[rgb(99,60,255,0.4)] disabled:outline-none shadow-md bg-accent text-white w-full md:w-[91px] flex flex-col items-center px-[27px] py-[11px] h-[46px] outline outline-1 outline-black rounded-lg"
                    >
                        <p className="text-[16px] font-semibold">Save</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Links;
