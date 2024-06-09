'use client';

export const Preview = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="text-sky-700 text-bold">Preview</div>
      <div className="p-2 w-full rounded-md text-black">{children}</div>
    </>
  );
};
