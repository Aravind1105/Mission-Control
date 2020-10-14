import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import history from 'lib/history';
import { getKioskSingle } from './selectors';
import ActivityLog from './components/ActivityLog';

const Log = ({ kiosk, isLoading }) => {
    const links = kiosk
        ? [
            {
                name: 'Home',
                link: '/dashboard',
            },
            {
                name: 'Kiosks',
                link: '/kiosks',
            },
            {
                name: kiosk.name,
                link: `/kiosks/detail/${kiosk._id}`,
            },
        ]
        : [];
    const backLink = kiosk
        ? {
            name: 'Back to kiosk detail',
            link: `/kiosks/detail/${kiosk._id}`,
        }
        : null;

    if (kiosk === null) {
        history.push('/kiosks');
    }

    return (
        <>
            {isLoading && <Loader />}
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment>
                            <Breadcrumbs
                                backLink={backLink}
                                links={links}
                                activeLink="Activity log"
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <ActivityLog />
            </Grid>
        </>
    );
};

const mapStateToProps = state => ({
    kiosk: getKioskSingle(state),
    isLoading: state.kiosks.isLoading,
});

export default connect(mapStateToProps)(Log);
