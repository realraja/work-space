import connectDB from "@/DB";
import Work from "@/model/workData";
import { NextResponse } from "next/server";


export const POST = async(req) =>{
    const {id,abcId,form,money} = await req.json();

    if(!id,!abcId,!form,!money){
        return NextResponse.json({
            status: 404,
            success: false,
            message : 'please enter all fields'
        })
    }

    try {
        await connectDB();

        const work = await Work.create({id,abcId,form,money,date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth()+1,new Date().getFullYear()]})

        if(!work){
            return NextResponse.json({
                status: 404,
                success: false,
                message : 'work not add'
            })
        }

        return NextResponse.json({
            status: 201,
            success: true,
            message : 'work added successfully'
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 404,
            success: false,
            message : 'some error in add',
            error: error.message
        })
    }
}


export const GET = async() =>{
    try {
        await connectDB();

        const work = await Work.find().sort({$natural:-1});

        if(!work){
            return NextResponse.json({
                status: 404,
                success: false,
                message : 'work not add'
            })
        }

        return NextResponse.json({
            status: 201,
            success: true,
            message : 'work fetched successfully',
            data: work
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 404,
            success: false,
            message : 'some error in add',
            error: error.message
        })
    
    }
}