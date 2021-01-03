import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { Chart } from './chart';
import { fetchHistoricalData } from '../services/axiosHist';
import { getParsedData } from '../utils/dataParser';
import { dataReducer, HIST, LIVE } from '../reducer/tradeReducer';
import socket from '../services/socket';

export const ChartView = () => {
    const [viewData, setViewData] = useState([]);
    const [live, setLive] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const [ state, dispatch ] = useReducer(dataReducer, { histData: [], liveData: [] });
    const handleTradeData = useCallback(response => {
        const histData = getParsedData(response);
        dispatch({ type: HIST,  data: histData });
    }, [dispatch]);

    const handleLiveData = useCallback((response) => {
        const subscribeData = getParsedData([response]);
        dispatch({ type: LIVE, data: subscribeData });
    }, [dispatch]);

    const handleSubscribe = useCallback((err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        handleLiveData(data);
    }, [handleLiveData])

    const updateTradeViewData = useCallback(() => {
        // fetch data based on view type from store and fetch
        if (!live) {
            // unsubscribe live data
            socket.unSubscribeData();
            setIsSubscribed(false);
            if (state.histData && state.histData.length) {
                setViewData(state.histData);
            } else {
                // fetch
                fetchHistoricalData(handleTradeData, error => console.log('error'));
            }
        } else {
            // subscribe live data
            if (isSubscribed) {
                setViewData(state.liveData);
                return;
            }
            socket.subscribeData(handleSubscribe);
            setIsSubscribed(true);
        }
    }, [live, isSubscribed, state, handleTradeData, handleSubscribe]);

    const handleViewSelection = isLive => {
        if (live === isLive) {
            return;
        }
        setLive(isLive);
        setViewData([]);
    };

    useEffect(() => {
        updateTradeViewData();
    }, [live, updateTradeViewData]);

    return (
        <div>
            <div className='main-view'>
                <div className={!live ? 'view-type selected' : 'view-type'}
                    onClick={() => handleViewSelection(false)}>
                    Historical
                </div>
                <div className={live ? 'view-type selected' : 'view-type'}
                    onClick={() => handleViewSelection(true)}>
                    Live
                </div>
            </div>
            <Chart cType={live} data={viewData}/>
        </div>
    );
}