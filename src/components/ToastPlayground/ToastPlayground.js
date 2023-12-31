import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";

import {ToastsContext} from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
    const [message, setMessage] = React.useState('');
    const [chosen, setChosen] = React.useState(VARIANT_OPTIONS[0]);

    const { toasts, handleToastClose, createNewToast } = React.useContext(ToastsContext);

    function submitHandler(e) {
        e.preventDefault()
        createNewToast(message, chosen);
        setMessage('');
        setChosen('notice')
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <img alt="Cute toast mascot" src="/toast.png"/>
                <h1>Toast Playground</h1>
            </header>

                <ToastShelf toasts={toasts} handleToastClose={handleToastClose}/>


            <form className={styles.controlsWrapper} onSubmit={(e)=> submitHandler(e)}>
                <div className={styles.row}>
                    <label
                        htmlFor="message"
                        className={styles.label}
                        style={{alignSelf: 'baseline'}}
                    >
                        Message
                    </label>
                    <div className={styles.inputWrapper}>
                        <textarea id="message" className={styles.messageInput} value={message}
                                  onChange={(e) => setMessage(e.target.value)}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}>Variant</div>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        {VARIANT_OPTIONS.map((variant) => (
                            <label htmlFor={`${variant}-notice`} key={variant}>
                                <input
                                    id={`${variant}-notice`}
                                    type="radio"
                                    name="variant"
                                    value={variant}
                                    checked={chosen === variant}
                                    onChange={(e) => setChosen(e.target.value)}
                                />
                                {variant}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}/>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        <Button>Pop Toast!</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToastPlayground;
