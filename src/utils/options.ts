export const options = [
    {
        label: "GitHub",
        value: "github",
        color: "#181717" // GitHub color
    },
    {
        label: "Gitlab",
        value: "gitlab",
        color: "#FC6D26" // GitLab color
    },
    {
        label: "Codepen",
        value: "codepen",
        color: "#000000" // CodePen color
    },
    {
        label: "Codewars",
        value: "codewars",
        color: "#C40000" // Codewars color
    },
    {
        label: "Facebook",
        value: "facebook",
        color: "#1877F2" // Facebook color
    },
    {
        label: "Twitter",
        value: "twitter",
        color: "#1DA1F2" // Twitter color
    },
    {
        label: "Devto",
        value: "devto",
        color: "#0A0A0A" // Dev.to color
    },
    {
        label: "Email",
        value: "email",
        color: "#D14836" // Email color (example)
    },
    {
        label: "FreeCodeCamp",
        value: "freecodecamp",
        color: "#4CAF50" // FreeCodeCamp color
    },
    {
        label: "Frontend Mentor",
        value: "frontend-mentor",
        color: "#F24E1E" // Frontend Mentor color
    },
    {
        label: "Hashnode",
        value: "hashnode",
        color: "#2962FF" // Hashnode color
    },
    {
        label: "Linkedin",
        value: "linkedin",
        color: "#0077B5" // LinkedIn color
    },
    {
        label: "StackOverflow",
        value: "stack-overflow",
        color: "#F48024" // Stack Overflow color
    },
    {
        label: "Twitch",
        value: "twitch",
        color: "#9146FF" // Twitch color
    },
    {
        label: "Youtube",
        value: "youtube",
        color: "#FF0000"
    },
];

export const formatPlatformName = (platform: string) => {
    return platform
        ?.split('-') // Split by hyphens
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        ?.join(' '); // Join back with spaces
};