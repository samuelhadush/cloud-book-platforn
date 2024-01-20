import React from "react";
import Section from "./Section";

type sectionTypes = {
  id: number;
  title: string;
  bookId: number;
  sectionId: number | null;
};
type Props = {
  sections: sectionTypes[];
};

function ListSections({ sections }: Props) {
  return (
    <div className="flex flex-col divide-y-2 divide-slate-200 gap-2 border-l border-slate-200">
      {sections.map((section) => {
        return <Section key={section.id} data={section} />;
      })}
    </div>
  );
}

export default ListSections;
