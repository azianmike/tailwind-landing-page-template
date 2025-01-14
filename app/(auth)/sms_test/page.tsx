'use client'

import React, {useState} from 'react';
import SendOTPForm from '../../../components/ui/SendOTPForm';
import VerifyOTPForm from '../../../components/ui/VerifyOTPForm';
import {StytchProvider} from "@stytch/nextjs";
import {createStytchUIClient} from "@stytch/nextjs/ui";

const stytchOptions = {
    cookieOptions: {
        availableToSubdomains: true,
        domain: ".usephortal.com",
    }}

const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC || "", stytchOptions);

const LoginWithSMS = () => {
    const [otpSent, setOTPSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [methodId, setMethodId] = useState('');

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <StytchProvider stytch={stytch}>
                        {!otpSent ? (
                            <SendOTPForm
                                phoneNumber={phoneNumber}
                                setMethodId={setMethodId}
                                setOTPSent={setOTPSent}
                                setPhoneNumber={setPhoneNumber}
                                description={null}
                            />
                        ) : (
                            <VerifyOTPForm methodId={methodId} phoneNumber={phoneNumber} closeOnSuccess={null}/>
                        )}
                    </StytchProvider>
                </div>
            </div>
        </section>
    );
};

export default LoginWithSMS;