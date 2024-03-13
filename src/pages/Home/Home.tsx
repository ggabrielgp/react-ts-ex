/* eslint-disable react-hooks/exhaustive-deps */
import { People } from '@/data/people';
import { addPeople } from '@/redux/states';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PeopleTable } from './components';


export type HomeProps = {
	// types...
}

const Home: React.FC<HomeProps> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addPeople(People));
	}, []);

	return (
		<div>
			<PeopleTable />
		</div>
	);
};

export default Home;
