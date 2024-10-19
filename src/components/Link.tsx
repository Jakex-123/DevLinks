"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Link = ({ id,num,removeLink,updateLink,hasError,errmessage }: {id:string, num: number,removeLink:any,updateLink:any,hasError:boolean,errmessage:string }) => {
    const [platform,setPlatform]=useState('github')
    const [url,setUrl]=useState('')
    useEffect(()=>{
        const newData={
            id,
            platform,
            url
        }
        updateLink(id,newData)
    },[platform,url])

    const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id})

    const style={
      transition,
      transform: CSS.Transform.toString(transform)
    }

  return (
    <div className='p-5 touch-none bg-background flex flex-col gap-3 rounded-xl' style={style} ref={setNodeRef} {...attributes} {...listeners} >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image
            src={"/images/icon-drag-and-drop.svg"}
            width={12}
            height={12}
            alt="draganddrop"
          />
          <p className="font-bold text-paragraph">Link #{num}</p>
        </div>
        <button onClick={()=>removeLink(id)} className="text-paragraph">Remove</button>
      </div>
      <Dropdown setPlatform={setPlatform}/>
      <Input setOnChange={setUrl} errormessage={hasError?errmessage:''} classes={hasError ? 'outline outline-2 outline-red-600' : ''} />
    </div>
  );
};

export default Link;
