import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const SendEmail = () => {
  const form = useRef();
  const sendEmail = (event) => {
    try {
      event.preventDefault();
      emailjs.sendForm(
        "service_r1owtd8",
        "template_izod7jq",
        form.current,
        "e_jryEu0t8GtjgaGf"
      );
      event.target.reset();
      console.log("OK 200");
    } catch (error) {
      console.log("NOT OK 404");
      console.log(error);
    }
  };
  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Subject</label>
        <input type="text" name="subject" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default SendEmail;
