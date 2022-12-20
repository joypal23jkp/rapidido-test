import React, { useEffect, useState } from 'react';

export const locals = [{
    id: 'es',
    label: 'ES',
    src: '/flags/es.png',
},
{
    id: 'en',
    label: 'US',
    src: '/flags/us.png',
},
{
    id: 'sv_SE',
    label: 'SW',
    src: '/flags/sv.png',
}];


export default function useLocal(init = 'es') {
    const [local, setLocal] = useState(init);
    const [currentLocale, setCurrentLocale] = useState(
        locals.find(loc => loc.id === local) || locals[0]
    );

    useEffect(() => {
        setCurrentLocale(
            locals.find(loc => loc.id === local) || locals[0]
        );
    }, [init])

    return [currentLocale, (state) => {
        setLocal(state);
    }];

};