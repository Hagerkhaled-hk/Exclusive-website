import React, { useState } from 'react';
import "./css/DashboardPage.css"
import Part1 from './part_1/part_1';
import Part2 from './part-2/part-2';
import Part3 from './part-3/part-3';
import Part4 from './part-4/part-4';
import Part5 from './part-5/part-5';
import Header from './common/header/header';
import Footer from './common/footer/footer';
import Nav from './common/Nav/Nav';
export default function Dashboard()
{

    return <div className="DashboardPage">

    <Part2/>
    <div className="container-Dashboard  first-container">

    <Part1/>
    <Part3/>
    </div>
    <div className="container-Dashboard sec-container">
    <Part4/>
<Part5/>
    </div>
<Footer/>
    </div>;
}