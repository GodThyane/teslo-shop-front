import axios from 'axios';

const tesloApi = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
});

const tesloApiInto = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api`,
});
export default tesloApi;
export { tesloApiInto };
