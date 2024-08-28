import React, { useRef, useState } from 'react'

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleSubmit = (e) =>{
        e.preventDefault();
       let email = emailRef.current.value;
       let password = passwordRef.current.value;
       const user = {email,password};
       console.log(user);

    }
  return (
    <div className='w-[40%] mx-auto my-4'>
        <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' value={emailRef.current.value} ref={emailRef}/>
            <input type="password" placeholder='Password' value={passwordRef.current.value} ref={passwordRef} />
            <input type="submit"  />
        </form>
    </div>
  )
}

export default Login