import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import SupportSection from '../SupportSection/SupportSection';
import MerchantCustomer from '../MerchantCustomer/MerchantCustomer';
import CustomerSaying from '../CustomerSaying/CustomerSaying';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <SupportSection></SupportSection>
            <MerchantCustomer></MerchantCustomer>
            <CustomerSaying></CustomerSaying>
        </div>
    );
};

export default Home;