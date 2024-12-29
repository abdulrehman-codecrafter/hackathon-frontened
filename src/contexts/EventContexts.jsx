
// import axios from 'axios';
// import React, { createContext, useContext, useEffect, useReducer } from 'react'


// const EventContext = createContext();
// const initialState = {
//     events: []
// }
// const reducer = (state, {type,payload}) => {

//     switch (type) {
//         case 'SET_EVENTS':
//             return {
//                 ...state,
//                 events: payload
//             }
//         case 'ADD_EVENT':
//             return {
//                 ...state,
//                 events: [...state.events, payload]
//             }
//         case 'UPDATE_EVENT':
//             return {
//                 ...state,
//                 events: state.events.map(event => event._id === payload._id ? payload : event)
//             }
//         case 'DELETE_EVENT':
//             return {
//                 ...state,
//                 events: state.events.filter(event => event._id !== payload)
//             }
//         default:
//             return state
//     }

// }

// export default function EventContextsProvider(props) {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const fetchEvents = async () => {
//         console.log('fetching events')
//         try{
//             const {data} = await axios.get('https://hackathon-backened-production.up.railway.app/events');
//             // console.log(data.data)
//             dispatch({type:'SET_EVENTS',payload:data.data})
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         fetchEvents()
//     },[])
//   return (
//     <EventContext.Provider value={{...state, dispatch}}>
//         {props.children}
//     </EventContext.Provider>
//   )
// }

// export const useEventsContext = () => {
//     return useContext(EventContext)
// }

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const EventContext = createContext();
const initialState = {
  events: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_EVENTS':
      return { ...state, events: payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event._id === payload._id ? payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event._id !== payload),
      };
    default:
      return state;
  }
};

export default function EventContextsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('https://hackathon-backened-production.up.railway.app/events');
      dispatch({ type: 'SET_EVENTS', payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when the context provider is mounted
  }, []);

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </EventContext.Provider>
  );
}

export const useEventsContext = () => {
  return useContext(EventContext);
};
