import Loading from '@/components/Loading';
import PageContainerSmall from '@/components/PageContainerSmall';
import { LOADING_ENUM } from '@/config/types';
import React from 'react';

const loading = () => {
    return (
        <PageContainerSmall>
            <Loading type={LOADING_ENUM.SMALL} />
        </PageContainerSmall>
    );
};

export default loading;
