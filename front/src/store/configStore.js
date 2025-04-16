// import create from 'zustand'
// export const configStore = create((set) => ({
//     config: {
//         category: null,
//         role: null,
//         customer: null,
//     },
//     setConfig: (params) =>
//         set((status) => ({
//             config: params,
//             ...status
//         }))
// }))


import { create } from "zustand"; // global state

export const configStore = create((set) => ({
    config: {
        category: null,
        role: null,
        supplier: null,
        purchase_status: null,
        brand: null,
        customer: null,
    },
    setConfig: (params) => 
        set((state) => ({
        config: params, //property in the state is to set to the new value
        ...state // ...state this used to include all other properties of the current state
        
    })),
}));
