import router from "@/router"
export const goSrarchResult = (keyword)  =>{
   return setTimeout(() => {
    router.push(`/result/${keyword}`)
   }, 0);
}