import { Person } from '@/models';
import { removeFavoriteByPersonId } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type FavoriteTableProps = {
	// types...
}

const FavoriteTable: React.FC<FavoriteTableProps> = () => {
	const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
	const dispatch = useDispatch();
	const pageSize = 5;
	const stateFavorites = useSelector((store: AppStore) => store.favorites);

	const findPerson = (person: Person) => !!stateFavorites.find(p => p.id === person.id)
	const filterPerson = (person: Person) => stateFavorites.filter(p => p.id !== person.id)

	const removeFromFav = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
		dispatch(removeFavoriteByPersonId(filteredPeople[0]))
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
					<IconButton color='secondary' onClick={() => removeFromFav(params.row)}>
						<Delete />
					</IconButton>
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

	return (
		<DataGrid
			disableDensitySelector
			autoHeight
			rows={stateFavorites}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			pageSizeOptions={[pageSize]}
			checkboxSelection={false}
			disableRowSelectionOnClick
			getRowId={(row: Person) => row.id}
		/>
	);
};

export default FavoriteTable;
