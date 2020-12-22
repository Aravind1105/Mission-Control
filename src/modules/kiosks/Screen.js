import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';


import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';
import CustomizeScreen from './components/CustomizeScreen';
import history from 'lib/history';
import { getKiosk } from './actions';
import { getKioskSingle } from './selectors';

const Screen = ({ getKiosk, kiosk, isKioskLoading, ...props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const links = [
        {
            name: 'Home',
            link: '/dashboard',
        },
        {
            name: 'Kiosks',
            link: '/kiosks',
        },
        {
            name: !kiosk ? '' : kiosk.name,
            link: `/kiosks/detail/${!kiosk ? props.match.params.id : kiosk._id}`,
        },
    ]
    const backLink = {
        name: 'Back to kiosk detail',
        link: `/kiosks/detail/${!kiosk ? props.match.params.id : kiosk._id}`,
    }

    const redirectHandler = () => {
        const redirectTo =
            props.match.params.id === 'new' ? '/kiosks' : `/kiosks/detail/${props.match.params.id}`;
        history.push(redirectTo);
    };

    const cancelHandler = ({ dirty }) => {
        console.log('asasas')
        if (dirty) setIsModalOpen(true);
        else redirectHandler();
    };

    useEffect(() => {
        getKiosk(props.match.params.id);
    }, []);
    return (
        <>
            {isKioskLoading && <Loader />}
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment>
                            <Breadcrumbs
                                backLink={backLink}
                                links={links}
                                activeLink="Settings"
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Header as="h3">General Settings</Header>
                            <Divider />
                            <CustomizeScreen
                                cancelHandler={cancelHandler}
                                isKioskLoading={isKioskLoading}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <ConfirmationModal
                    title="Confirm Cancelling"
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    confirmHandler={redirectHandler}
                >
                    <p>You have unsaved changes.</p>
                    <p>Are you sure you want to leave the page?</p>
                </ConfirmationModal>
            </Grid>
        </>
    );
};

const mapStateToProps = state => ({
    kiosk: getKioskSingle(state),
    isKioskLoading: state.kiosks.isKioskLoading,
});
const mapDispatchToProps = {
    getKiosk
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
