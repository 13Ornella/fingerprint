import React from "react";
import PieChart from "./piechart";
import MyChart from "./piechart";
import { FaChartLine, FaFileAlt  } from "react-icons/fa";
import {GrDocumentMissing } from "react-icons/gr";
import StaggeredDropDown from "../components/droopdown";
import { Header } from "../components/header";
import { Link } from "react-router-dom";
import { MdEvent } from "react-icons/md";

export const Dashboard = () => {
    return(
      <div>

<Header/>

     <div className="grid grid-cols-4 gap-4 m-4">
         <div className="">
          <Link href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white flex">
                Demandes d'absence
                </h5>
                <div className="flex bg-white shadow-md p-2 rounded-md">
                  <FaFileAlt className="w-8 h-8 text-gray-400"/> 
                  <ul className="ml-2 text-gray-400">
                    <li>demande d'absence.pdf</li>
                    <li>demande d'absence.pdf</li>
                    <li>demande d'absence.pdf</li>
                  </ul>
                </div>
          </Link>
         </div>
         <div className="">
         <Link href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white flex">
                Justification d'absence
                </h5>
                <div className="flex bg-white shadow-md p-2 rounded-md">
                  <FaFileAlt className="w-8 h-8 text-gray-400"/> 
                  <ul className="ml-2 text-gray-400">
                    <li>ordonance.pdf</li>
                    <li>faire part.pdf</li>
                    <li>invitation mariage.pdf</li>
                  </ul>
                </div>
          </Link>
         </div>
         <div className="">
         <Link href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white flex">
    Liste des absents
    </h5>
    <div className="flex bg-white shadow-md p-2 rounded-md">
    <GrDocumentMissing  className="w-8 h-8 text-gray-400"/> 
    <ul className="ml-2 text-gray-400">
                    <li>RABETAFIKA Louis</li>
                    <li>BERTHIN Andry</li>
                    <li>RALAIVAO Christian</li>
                  </ul>
    </div>
</Link>
         </div>
         <div className="">
          <Link href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white flex">
                Evenements a venir
                </h5>
                <div className="flex bg-white shadow-md p-2 rounded-md">
                  <MdEvent className="w-8 h-8 text-gray-400"/> 
                  <ul className="ml-2 text-gray-400">
                    <li>Hackaton 2025</li>
                    <li>Match inter universitaire</li>
                    <li>Sortie de promotion</li>
                  </ul>
                </div>
          </Link>
         </div>
         </div>
     
    
<div className="bg-white shadow w-full h-1/2 m-4 p-4 rounded-md">

<MyChart/>
</div>


        </div>
    )
}