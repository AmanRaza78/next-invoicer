import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.id){
        throw new Error("User not found")
    }

    const dbuser = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })

    if(!dbuser){
        await prisma.user.create({
            data:{
                id: user.id,
                firstname: user.given_name || "",
                lastname: user.family_name || "",
                email: user.email || "",
                profilepicture: user.picture || "",
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000/dashboard")
}