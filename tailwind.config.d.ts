//this file is used to define the types of the tailwindcss configuration
declare const config: {
  theme: {
    extend: {
      colors: {
        [color: string]: string;
      };
    };
  };
};

export default config;