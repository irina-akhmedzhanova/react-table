import { useState } from 'react';
import {
  StepBackwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { rows } from './constants/constants';
import cn from 'classnames';
import classes from './App.module.scss';

const columnsNames = [
  { name: 'Название продукта', id: 'name' },
  { name: 'Ккал на 100г', id: 'calories' },
  { name: 'Белки, г', id: 'proteins' },
  { name: 'Жиры, г', id: 'fats' },
  { name: 'Углеводы, г', id: 'carbs' }
];

function App() {

  const selectOptions = ['15', '25', '50'];
  const count = rows.length;

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);
  const [rowsForRender, setRowsForRender] = useState(rows);
  const [inputValue, setInputValue] = useState('');

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0)
  };

  const onChangePage = (event, newPage) => {
    setPage(newPage)
  };

  const handleClickFirstPage = (event) => {
    onChangePage(event, 0)
  };

  const handleClickPrevPage = (event) => {
    onChangePage(event, page - 1)
  };

  const handleClickNextPage = (event) => {
    onChangePage(event, page + 1)
  };

  const handleClickLastPage = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  };

  const handleClickSort = (event) => {
    const id = event.target.id;
    const rowsForSort = [...rowsForRender];
    const result = sortByColumnsName(id, rowsForSort);
    setRowsForRender(result)
  };

  const sortByColumnsName = (name, arr) => {
    arr.sort((a, b) => {
      let result = a[name] > b[name] ? 1 : a[name] < b[name] ? -1 : 0
      return result
    })
    return arr
  };

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const rowsForFilter = [ ...rows ];
    setPage(0);
    const result = value === '' ? rows : filterTable(value, rowsForFilter) ;
    setRowsForRender(result)
  };

  const filterTable = (value, arr) => {
    const regV = value.toLowerCase();
    const filterTable = arr.filter((item) => {
      const t = item.name.toLowerCase();
       const result = t.match(regV) ? true : false;
      return result
    })
    return filterTable
  };

  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <div className={cn(classes.tableRow, classes.tableHead)}>
          {columnsNames.map((item, index) => (
            <div key={item.id + index}><button id={item.id} onClick={handleClickSort}>{item.name}</button></div>
          ))}
        </div>
        <div className={classes.tableBody}>
          {rowsForRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <div className={classes.tableRow} key={row.name + index}>
              <div><p>{row.name}</p></div>
              <div><p>{row.calories}</p></div>
              <div><p>{row.proteins}</p></div>
              <div><p>{row.fats}</p></div>
              <div><p>{row.carbs}</p></div>
            </div>
          ))}
        </div>
        <div className={classes.tablePagination}>
          <div>
            <SearchOutlined />
            <input 
              type='text'
              placeholder='Поиск по названию продукта'
              onInput={handleChangeSearch}
              value={inputValue}
            />
          </div>
          <div>
            <p>Строк на странице:&nbsp;</p>
            <select
              onChange={handleChangeRowsPerPage}
              defaultValue='3'
            >
              {selectOptions.map((item, index) => (
                <option
                  value={item}
                  key={item + index}
                  label={item}
                >{item}</option>
              ))}

            </select>
          </div>
          <div>
            <span>Страница {page + 1}</span>
            <button onClick={handleClickFirstPage} disabled={page === 0}>
              <StepBackwardOutlined />
            </button>
            <button onClick={handleClickPrevPage} disabled={page === 0}>
              <CaretLeftOutlined />
            </button>
            <button
              onClick={handleClickNextPage}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
              <CaretRightOutlined />
            </button>
            <button
              onClick={handleClickLastPage}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
              <StepForwardOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
