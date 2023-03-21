interface IProductSlug {
   slug: string;
}

export const fetchSlugs = async (
   init: RequestInit = {}
): Promise<IProductSlug[]> => {
   const base = process.env.BACKEND_URL || '';
   const url = `${base}/products/slugs`;
   const res = await fetch(url, init);
   return await res.json();
};
