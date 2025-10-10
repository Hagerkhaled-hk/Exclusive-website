import { useContext, useEffect } from "react";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import RedButton from "../../Common/redButton/redButton";
import "./contact.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";

export default function Contact() {
    const {isLogin}=useContext(UserContext);
    const navigate=useNavigate(null);
    
    useEffect(()=>{
        if(!isLogin()) navigate("/signup");
    })
    return (
        <div className="contact">

            <DynamicIndex page={["Home","Contact"]} />
<div className="contact-page">

            <div className=" contact-wrapper">

                <aside className="contact-info">
                    <div className="info-card">
                        <div className="icon call">📞</div>
                        <h3>Call To Us</h3>
                        <p>We are available 24/7, 7 days a week.</p>
                        <p className="phone">Phone: +8801(111)2222</p>
                    </div>

                    <div className="info-card">
                        <div className="icon mail">✉️</div>
                        <h3>Write To Us</h3>
                        <p>Fill out our form and we will contact you within 24 hours.</p>
                        <p>Emails: customer@exclusive.com</p>
                        <p>Emails: support@exclusive.com</p>
                    </div>
                </aside>

                <main className="contact-form">
                    <form className="form-card" onSubmit={(e) => e.preventDefault()}>
                        <div className="inputs-row">
                            <input type="text" placeholder="Your Name *" disabled readOnly />
                            <input type="email" placeholder="Your Email *" disabled readOnly />
                            <input type="tel" placeholder="Your Phone *" disabled readOnly />
                        </div>

                        <textarea placeholder="Your Massage" rows="6" disabled readOnly />

                        <div className="form-actions">
                        <RedButton text={"Send Message"} />
                        </div>
                    </form>
                </main>
            </div>
            </div>

        </div>
    );
}
