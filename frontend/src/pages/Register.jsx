import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidMail(EMAIL_REGEX.test(mail));
    }, [mail])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd && matchPwd !== '');
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL + '/register',
            {
                username: user,
                email: mail,
                password: pwd,
            }
            );
            const data = response.data;
            console.log(data);
            if (!data.error) {
                setSuccess(true);
            }
            else {
                setErrorMessage(data.error)
            }
        } catch (err) {
            console.log(err)
        }
        setUser('');
        setMail('');
        setPwd('');
        setMatchPwd('');
    }

    return (
        <>
            {success ? (
                <section>
                    <h1 className='font-dmsans mb-2'>Your account has been successfully created</h1>
                </section>
            ) : (
                <section>
                    <div className='flex flex-col items-center justify-center w-full flex-1 text-center font-dmsans mb-12'>
                        <div className='bg-white rounded-md shadow-2xl flex flex-col lg:flex-row w-full max-w-3xl'>
                            <div className='w-full p-5'>
                                <div className='py-10'>
                                    <h2 className='text-3xl font-bold text-black mb-2'>Register</h2>
                                    <div className='border-2 w-10 border-peach-400 inline-block mb-2'/>
                                    <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                            <CgProfile className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100 outline-none text-sm flex-1'
                                                type="text"
                                                id="username"
                                                placeholder='Username'
                                                autoComplete="off"
                                                onChange={(e) => setUser(e.target.value)}
                                                value={user}
                                                required
                                            />
                                        </div>
                                        {!validName && (
                                            <p id="uidnote" className='text-gray-400 mb-3'>
                                                4 to 24 characters.<br />
                                                Must begin with a letter.<br />
                                                Letters, numbers, underscores, hyphens allowed.
                                            </p>
                                        )}

                                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                            <FaRegEnvelope className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100  outline-none text-sm flex-1'
                                                type="text"
                                                id="email"
                                                placeholder='Email'
                                                autoComplete="off"
                                                onChange={(e) => setMail(e.target.value)}
                                                value={mail}
                                                required
                                            />
                                        </div>
                                        {!validMail && (
                                            <p id="mailnote" className='text-gray-400 mb-3'>
                                                Must include <span>@</span> and <span>.</span> with some letters or numbers in between.<br />
                                                Must specify a domain.
                                            </p>
                                        )}

                                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                            <MdLockOutline className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100 outline-none text-sm flex-1'
                                                type="password"
                                                id="password"
                                                placeholder='Password'
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={pwd}
                                                required
                                            />
                                        </div>
                                        {!validPwd && (
                                            <p id="pwdnote" className='text-gray-400 mb-3'>
                                                8 to 24 characters.<br />
                                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                                Allowed special characters: <span>!</span> <span>@</span> <span>#</span> <span>$</span> <span>%</span>
                                            </p>
                                        )}

                                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                            <MdLockOutline className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100 outline-none text-sm flex-1'
                                                type="password"
                                                id="confirm_pwd"
                                                placeholder='Confirm password'
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                value={matchPwd}
                                                required
                                            />
                                        </div>
                                        {!validMatch && (
                                            <p id="confirmnote" className='text-gray-400 mb-3'>
                                                Must match the first password input field.
                                            </p>
                                        )}
                                        <div className='mb-2'></div>
                                        <button className='border-2 rounded-md px-12 py-2 inline-block font-semibold text-black' disabled={!validName || !validMail || !validPwd || !validMatch ? true : false}>Sign up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Register