export interface Props {
   title: string;
   description: string;
   imageFullUrl?: string;
}

export default function DefaultTags({
   title,
   description,
   imageFullUrl,
}: Props) {
   return (
      <>
         <title>{title}</title>

         <meta name="description" content={description} />
         <meta name="og:title" content={title} />
         <meta name="og:description" content={description} />
         {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </>
   );
}
