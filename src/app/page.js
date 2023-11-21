"use client";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {GridLoader} from 'react-spinners'
import ConfirmButton from "./components/ConfirmDelete";

export default function Home() {
  const [id, setId] = useState("");
  const [abcId, setAbcId] = useState(false);
  const [form, setForm] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [workList, setWorkList] = useState([]);
  const [isError, setIsError] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState('');


  const handleAddForm = async () =>{
    try {
      const {data} = await axios.post('/api/add-work',{
        id,abcId: abcId?'yes':'no' ,
        form: form?'yes':'no' 
      })
  
      if(data.success){
        fetchWorkList();
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  const handleDelete = async() =>{
    try {
      const {data} = await axios.delete(`/api/add-work/${deleteId}`)
      console.log(data)
      if(data.success){
        toast.success(data.message)
        fetchWorkList();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  const fetchWorkList = async() =>{
    try {
      const {data} = await axios.get('/api/add-work');
      console.log(data);
      if(data.success){
        setPageLoading(false);
        setWorkList(data.data);
      }else{
        setPageLoading(false);
        setIsError(true);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setPageLoading(false);
      setIsError(true);
    }
  }

  useEffect(()=>{
    fetchWorkList();
  },[])
  return (
    <div>
      <ConfirmButton comfirmState={deleteConfirm} setComfirmState={setDeleteConfirm} buttonText={'Delete'} runFunction={handleDelete} />
      {/* <TheAddForm comfirmState={confirm} setComfirmState={setConfirm} /> */}
      <div className="bg-gradient-to-r from-rose-800 to-violet-500 rounded text-4xl w-[90%] m-auto py-3 my-3 text-center">
        <h1>Filled Forms</h1>
      </div>

      <div className="bg-gradient-to-r from-rose-800 to-violet-500 rounded w-[75%] m-auto py-5">
        <div className="flex justify-center items-center gap-x-6 ">
          <input
            className="w-[30%] border-[1px] rounded-xl border-gray-500 outline-none py-1 px-3 text-lg"
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="number"
          />

          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={abcId}
              onChange={() => setAbcId((abcId) => !abcId)}
              className="accent-violet-700 scale-150 cursor-pointer"
              type="checkbox"
              id="CharacterInput"
            />
            <label className="text-xl">ABC</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={form}
              onChange={() => setForm((form) => !form)}
              className="accent-violet-700 scale-150 cursor-pointer"
              type="checkbox"
              id="CharacterInput"
            />
            <label className="text-xl">FORM</label>
          </div>
        </div>

        <div className="flex justify-center items-center my-4 cursor-pointer  ">
          <button
            onClick={handleAddForm}
            className="active:scale-105 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white  focus:outline-none "
          >
            <span className="flex justify-center items-center px-8 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <IoAddCircleOutline className="mr-3 w-6 h-6" />
              Add App
            </span>
          </button>
        </div>
      </div>

{loading?<div className='h-[40vh] w-full flex flex-col items-center justify-center'> <GridLoader speedMultiplier={2} color='red' size={40} /> </div> :<div className="flex flex-wrap justify-around items-center gap-5 my-5 w-[70%] m-auto">
        
        {workList.map((item) => {
          return (
            <div
              onContextMenu={(ev) => {
                ev.preventDefault();
                setDeleteId(item._id);
                setDeleteConfirm(true);
              }}
              key={item._id}
              className={`${(item.date[3]+item.date[4])%2 === 0? 'bg-sky-200':'bg-fuchsia-200'} flex flex-col justify-center items-center text-center border-2 rounded-xl p-3   space-y-3  hover:bg-black/10`}
            >
              <h1 className="mb-3 text-rose-600 min-w-[50%] border-b-2 border-gray-500 ">
                {item.id}
              </h1>

              {item.id && (
                <div
                  className=" flex justify-around p-1 border-[1px] rounded cursor-pointer text-2xl  hover:text-violet-700 gap-1"
                >
                  <span>ABC :</span>
                  {item.abcId === 'no'?<RxCross2 className="m-auto text-rose-400" />:<FaCheck className="m-auto text-green-400" />}
                  {/* <marquee truespeed>{id} </marquee> */}
                  {/* <IoCopyOutline className="m-auto" /> */}
                </div>
              )}

              <button
                className="flex justify-around p-1 items-center border-[1px] rounded cursor-pointer text-2xl  hover:text-violet-700 gap-1"
              >
              <span>FORM :</span>
              {item.form === 'no'?<RxCross2 className="m-auto text-rose-400" />:<FaCheck className="m-auto text-green-400" />}
                {/* <IoCopyOutline className="m-auto" /> */}
              </button>
              <p className="flex">
              {item.date[2]}:{item.date[1]}| {item.date[3]}-{item.date[4]}-{item.date[5]}
              </p>
            </div>
          );
        })}
      </div>}
      
    </div>
  );
}
