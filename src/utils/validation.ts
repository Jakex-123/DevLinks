// @ts-nocheck
import { z } from "zod";

// Define platform-specific URL patterns
const platformUrlPatterns = {
  github: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
  gitlab: /^https?:\/\/(www\.)?gitlab\.com\/[A-Za-z0-9_-]+$/,
  codepen: /^https?:\/\/(www\.)?codepen\.io\/[A-Za-z0-9_-]+$/,
  codewars: /^https?:\/\/(www\.)?codewars\.com\/users\/[A-Za-z0-9_-]+$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+$/,
  twitter: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_-]+$/,
  devto: /^https?:\/\/(www\.)?dev\.to\/[A-Za-z0-9_-]+$/,
  email: /^mailto:.+@.+\..+$/,
  freecodecamp: /^https?:\/\/(www\.)?freecodecamp\.org\/[A-Za-z0-9_-]+$/,
  "frontend-mentor": /^https?:\/\/(www\.)?frontendmentor\.io\/[A-Za-z0-9_-]+$/,
  hashnode: /^https?:\/\/(www\.)?hashnode\.com\/@?[A-Za-z0-9_-]+$/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
"stack-overflow": /^https?:\/\/(www\.)?stackoverflow\.com\/[A-Za-z0-9_-]+\/[0-9]+\/[A-Za-z0-9_-]+\/?$/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[A-Za-z0-9_-]+$/,
  youtube: /^https?:\/\/(www\.)?(youtube\.com\/[A-Za-z0-9_-]+|youtu\.be\/[A-Za-z0-9_-]+)$/,
};

// Function to validate URL against platform-specific pattern
const validateUrlByPlatform = (platform: string, url: string) => {
  const pattern = platformUrlPatterns[platform.toLowerCase()];
  return pattern ? pattern.test(url) : true; // Return true for platforms without a pattern
};

// Define the schema with custom URL validation and no generic "Invalid URL" message
export const linkSchema = z
  .object({
    platform: z.string(),
    url: z
      .string()
      .min(1, { message: "Can't be empty" }) // Check for empty URL
  })
  .superRefine((obj, ctx) => {
    const { platform, url } = obj;
    if (url.length > 0 && !validateUrlByPlatform(platform, url)) {
      ctx.addIssue({
        code: "custom",
        message: "Please check the URL",
        path: ["url"], // Associate error with the URL field
      });
    }
  });

export const signupSchema=z.object({
  name:z.string().min(1),
  email:z.string().email(),
  password:z.string().min(6)
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
});

