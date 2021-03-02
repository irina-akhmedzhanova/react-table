import { useState } from 'react';
import {
  StepBackwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  StepForwardOutlined
} from '@ant-design/icons';
import cn from 'classnames';
import classes from './App.module.scss';

const createDataItem = (name, calories, proteins, fats, carbs) => (
  { name, calories, proteins, fats, carbs }
);

const rows = [
  createDataItem('Йогурт 1,5%', 65, 4.3, 1.5, 8.4),
  createDataItem('Йогурт 3,2%', 87, 5, 3.2, 8.9),
  createDataItem('Молоко 2,5%', 53, 2.8, 2.5, 4.6),
  createDataItem('Молоко 3,2%', 58, 2.8, 3.2, 4.6),
  createDataItem('Сметана 15%', 163, 3, 15, 2.9),
  createDataItem('Сметана 20%', 209, 3, 20, 2.9),
  createDataItem('Мoлоко сгущенное', 139, 9, 4.6, 72.8),
  createDataItem('Сыр "Адыгейский"', 226, 19, 16, 1.5),
  createDataItem('Сыр брынза', 262, 22.1, 19.2, 0.4),
  createDataItem('Сыр голладский', 370, 26.8, 27.4, 0),
  createDataItem('Сыр российский', 371, 23.4, 30, 0),
  createDataItem('Сыр плавленый', 226, 24, 13.5, 0),
  createDataItem('Творог обезжиренный', 86, 18, 0.6, 1.5),
  createDataItem('Геркулес', 355, 13.1, 6.2, 65.7),
  createDataItem('Гречневая крупа', 329, 12.6, 2.6, 68),
  createDataItem('Манная крупа', 326, 11.3, 0.7, 73.3),
  createDataItem('Перловая крупа', 324, 9.3, 1.1, 73.7),
  createDataItem('Рис', 323, 7, 0.6, 73.7),
  createDataItem('Фасоль', 309, 22.3, 1.7, 54.5),
  createDataItem('Соя', 395, 34.9, 17.3, 26.5),
  createDataItem('Чечевица', 310, 24.8, 1.1, 53.7),
  createDataItem('Баклажаны', 24, 0.6, 0.1, 5.5),
  createDataItem('Капуста', 28, 1.8, 0, 5.4),
  createDataItem('Картофель', 83, 2, 0.1, 19.7),
  createDataItem('Морковь', 33, 1.3, 0.1, 7),
  createDataItem('Томаты', 19, 0.6, 0, 4.2),
  createDataItem('Огурцы', 15, 0.8, 0, 3),
  createDataItem('Перец сладкий', 23, 1.3, 0, 4.7),
  createDataItem('Ананас', 48, 0.4, 0, 11.8),
  createDataItem('Апельсин', 38, 0.9, 0, 8.4),
  createDataItem('Банан', 91, 1.5, 0, 22.4),
  createDataItem('Виноград', 69, 0.4, 0, 17.5),
  createDataItem('Мандарин', 38, 0.8, 0, 8.6),
  createDataItem('Яблоки', 46, 0.4, 0, 11.3),
  createDataItem('Арахис', 548, 26.3, 45.2, 9.7),
  createDataItem('Грецкий орех', 648, 13.8, 61.3, 10.2),
  createDataItem('Миндаль', 645, 18.6, 57.7, 13.6),
  createDataItem('Фундук', 704, 16.1, 66.9, 9.9),
  createDataItem('Курага', 272, 5.2, 0, 65.9),

];

const columnsNames = [
  { name: 'Название продукта', id: 'name' },
  { name: 'Ккал на 100г', id: 'calories' },
  { name: 'Белки, г', id: 'proteins' },
  { name: 'Жиры, г', id: 'fats' },
  { name: 'Углеводы, г', id: 'carbs' }
];

function App() {

  const selectOptions = ['10', '25', '50'];
  const count = rows.length;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsForRender, setRowsForRender] = useState(rows);

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
    const sortRows = [...rowsForRender];
    const result = sortByColumnsName(id, sortRows);
    setRowsForRender(result)
  };

  const sortByColumnsName = (name, arr) => {
    arr.sort((a, b) => {
      let result = a[name] > b[name] ? 1 : a[name] < b[name] ? -1 : 0
      return result
    })
    return arr
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
          {rowsForRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <div className={classes.tableRow} key={row.name}>
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
