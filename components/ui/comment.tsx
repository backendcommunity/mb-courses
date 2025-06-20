"use client";
import { DiscussionEmbed } from "disqus-react";
import { useTheme } from "next-themes";
import React from "react";

interface DisqusCommentBlockProps {
  shortname?: string;
  config?: {
    url?: string;
    identifier?: string;
    title?: string;
    language?: string;
  };
}

const DisqusCommentBlock: React.FC<DisqusCommentBlockProps> = ({
  shortname = "masteringbackend",
  config,
}) => {
  const { theme } = useTheme();
  return (
    <div>
      <DiscussionEmbed
        key={theme}
        shortname={shortname}
        config={{
          url: `${window.location.origin}/${config?.url}`,
          identifier: config?.identifier,
          title: config?.title,
          language: config?.language || "en_EN",
        }}
      />
    </div>
  );
};

export default DisqusCommentBlock;
