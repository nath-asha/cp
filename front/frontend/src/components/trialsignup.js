import react, {useState,useEffect} from 'react';

const Signee = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    useEffect(() => {
        validateEmail(email);
        validatePassword(password);
    },[email,password]);

    const validateEmail = (value) => {
        const emailpat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailpat.test(value));
    };

    const validatePassword = (value) => {
        const passwordpat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        setIsPasswordValid(passwordpat.test(value));
    };

return(
    <div>
        <div>
            <input 
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            />
            {!isEmailValid && <p style={{color:'red'}}>Invalid email address</p>}
        </div>
        <div>
            <input 
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            />
            {!name && <p style={{color: 'red'}}>Enter name</p>}
        </div>
        <div>
            <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            />
        {!isPasswordValid && <p style={{color:'red'}}>Password must be at least 8 characters </p>}
        </div>
    </div>
)
};

export default Signee;