import { auth } from "@/auth"
 
export default auth((req) => {
    
    console.log(req.auth)
    console.log(req)
    if (!req.auth) {
        const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})
 
export const config = {
  matcher: ["/forms/unban", "/forms/modApp"],
}