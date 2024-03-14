import { Person } from '@/models';
import { addFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type PeopleTableProps = {
	// types...
}

const PeopleTable: React.FC<PeopleTableProps> = () => {
	const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
	const pageSize = 5;
	const dispatch = useDispatch();
	const statePeople = useSelector((store: AppStore) => store.people);
	const favoritePeople = useSelector((store: AppStore) => store.favorites);

	const findPerson = (person: Person) => !!(favoritePeople.find(p => p.id === person.id));
	const filterPerson = (person: Person) => favoritePeople.filter(p => p.id !== person.id);

	const handleChange = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
		dispatch(addFavorite(filteredPeople)) //addFavorite(newArray)  ->  "type: favorite/addFavorite", payload: []
		setSelectedPeople(filteredPeople);
	}

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			sortable: false,
			headerName: '',
			width: 90,
			renderCell: (params: GridRenderCellParams) => (
				<>
					<Checkbox size='small' checked={findPerson(params.row)} onChange={() => handleChange(params.row)} />
				</>
			)
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'category',
			headerName: 'Categories',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'company',
			headerName: 'Company',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'levelOfHappiness',
			headerName: 'Level of happiness',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		}
	];

	useEffect(() => {
		setSelectedPeople(favoritePeople)
	}, [favoritePeople])

	return (
		<DataGrid
			rows={statePeople}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			pageSizeOptions={[pageSize]}
			rowCount={selectedPeople.length}
			getRowId={(row) => row.id}
			rowSelection={false}
			disableColumnSelector
		/>
	);
};

export default PeopleTable;
