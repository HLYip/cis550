import { React, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getStateInfo } from "fetcher";

const Container = tw.div`relative`;
const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`;
const Actions = styled.div`
  ${tw`relative text-center mt-10 mb-10 flex leading-none`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;


export default () => {
  const [state, setState] = useState('PA')
  const [input, setInput] = useState('')
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6415FF',
      color: '#ffffff',
      fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const columns = [
    { id: 'county', label: 'County', minWidth: 170 },
    { 
      id: 'average_rating', 
      label: 'Average Rate', 
      minWidth: 100,
      format: (value) => value.toFixed(2),
      align: 'right'
    },
    {
      id: 'num_category_county',
      label: 'Category Level',
      minWidth: 100,
      align: 'right'
    },
    {
      id: 'positive_level',
      label: 'Pandemic Level',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'vaccination_level',
      label: 'Vaccination Level',
      minWidth: 170,
      align: 'right',
    },
  ] 

  useEffect(() => {
    getStateInfo(state).then(recResult => {
      if (recResult.status === 200) {
        setRows(recResult.result.results)
        console.log(rows)
      } else {
        alert('Error. Please contact developers')
      }
    })
  }, [state])

  const changeInput = (e) => {
    setInput(e.target.value)
  }

  const changeState = () => {
    setState(input)
    setPage(0);
    setInput('')
  }

  return (
    <Container>
      <SingleColumn>
        <HeaderRow>
          <Header>
            View the statistics of <HighlightedText>{state}.</HighlightedText>
          </Header>
          <Actions>
            <input type="text" placeholder="State Abbreviation" value={input} onChange={changeInput}/>
            <button onClick={changeState}>Search</button>
          </Actions>
        </HeaderRow>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440, marginTop: '30px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" colSpan={2}>
                  Restaurant Score
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={3}>
                  Health Score
                </StyledTableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell2
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell2>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        if (value === null) {
                          value = '--'
                        }
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </SingleColumn>
    </Container>
  );
};
