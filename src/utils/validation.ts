// @ts-nocheck
import { z } from "zod";

// Define platform-specific URL patterns
const platformUrlPatterns = {
  github: /^https:\/\/(www\.)?github\.com\/?.*$/,
  gitlab: /^https:\/\/(www\.)?gitlab\.com\/?.*$/,
  codepen: /^https:\/\/(www\.)?codepen\.io\/?.*$/,
  codewars: /^https:\/\/(www\.)?codewars\.com\/?.*$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/?.*$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/?.*$/,
  devto: /^https:\/\/(www\.)?dev\.to\/?.*$/,
  email: /^mailto:.+@.+\..+$/, // email validation remains the same
  freecodecamp: /^https:\/\/(www\.)?freecodecamp\.org\/?.*$/,
  "frontend-mentor": /^https:\/\/(www\.)?frontendmentor\.io\/?.*$/,
  hashnode: /^https:\/\/(www\.)?hashnode\.com\/?.*$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/?.*$/,
  "stack-overflow": /^https:\/\/(www\.)?stackoverflow\.com\/?.*$/,
  twitch: /^https:\/\/(www\.)?twitch\.tv\/?.*$/,
  youtube: /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/?.*$/,
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

