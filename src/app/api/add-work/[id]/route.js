const { default: connectDB } = require("@/DB");
const { default: Work } = require("@/model/workData");
const { NextResponse } = require("next/server");


export const DELETE = async(req,{params}) =>{
    const {id} = params;
    if(!id){
        return NextResponse.json({
            status: 404,
            success: false,
            message:'Id not entered'
        })
    }

    try {
        await connectDB();

        await Work.deleteOne({_id:id});

        return NextResponse.json({
            status: 200,
            success: true,
            message:'dleted successfully'
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status:400,
            success:false,
            message: 'some error in delete',
            error:error.message
        })
    }
}