import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="py-2 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground ">
          Made with ❤️ by{" "}
          <a
            href={"https://ayushagr.me"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Ayush
          </a>
          . The source code is available on{" "}
          <a
            href={"https://github.com/A91y/erc20launcher"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
