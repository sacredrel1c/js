let data =
    'x_coord,y_coord,Киев,2868702\n' +
    'x_coord,y_coord,Харьков,1451132\n' +
    'x_coord,y_coord,Одесса,1017022\n' +
    'x_coord,y_coord,Днепр,1001094\n' +
    'x_coord,y_coord,Донецк,949 825\n' +
    'x_coord,y_coord,Запорожье,766 268\n' +
    'x_coord,y_coord,Львов,729 038\n' +
    'x_coord,y_coord,Кривой Рог,652 137\n' +
    'x_coord,y_coord,Симферополь,338 319\n' +
    'x_coord,y_coord,Николаев,494 922\n' +
    'x_coord,y_coord,Мариуполь,458 533\n' +
    'x_coord,y_coord,Луганск,424 113\n' +
    'x_coord,y_coord,Винница,372 116\n' +
    'x_coord,y_coord,Макеевка,351 820\n' +
    'x_coord,y_coord,Херсон,297 593\n' +
    'x_coord,y_coord,Полтава,295 950\n' +
    'x_coord,y_coord,Чернигов,295 670\n' +
    'x_coord,y_coord,Черкассы,285 170\n' +
    'x_coord,y_coord,Житомир,270 922\n' +
    'x_coord,y_coord,Сумы,268 874\n' +
    'x_coord,y_coord,Хмельницкий,266 095\n' +
    'x_coord,y_coord,Черновцы,262 129\n' +
    'x_coord,y_coord,Горловка,254 416\n' +
    'x_coord,y_coord,Ровно,249 912\n' +
    'x_coord,y_coord,Каменское,241 475\n' +
    'x_coord,y_coord,Кропивницкий,233 333\n' +
    'x_coord,y_coord,Ивано-Франковск,227 030\n' +
    'x_coord,y_coord,Кременчуг,225 828\n' +
    'x_coord,y_coord,Тернополь,217 110\n' +
    'x_coord,y_coord,Луцк,216 076\n' +
    'x_coord,y_coord,Белая Церковь,211 205';
let originData = 'Киев был основа братьями Кий Щек и Хорыв и их сестрой Лыбидь! При этом Харьков, был столицей Украины при УПА! В Горловке добывают соль, а Одесса мама))'
function parseCSV(data){
    let rows = data.split("\n");
    let filteredRows = rows.filter(row => row.length > 0);
    filteredRows = filteredRows.filter(row => !row.includes("#"));

    let rowMap = filteredRows.map(function(row){
        let mappedRow = new Map();
        let splitedRow = row.split(",");
        mappedRow.set("x", splitedRow[0]);
        mappedRow.set("y", splitedRow[1]);
        mappedRow.set("name", splitedRow[2]);
        mappedRow.set("population", parseInt(splitedRow[3].replaceAll(" ", "")));
        return mappedRow;
    });
    rowMap = rowMap.sort(function (firstCityRow, secondCityRow){
        return secondCityRow.get("population") - firstCityRow.get("population");
    });
    let slicedMap = rowMap.slice(0,10);
    let rating = {};
    let reducedMap = slicedMap.reduce(function (prev, currentCity, index) {
        let name = currentCity.get("name");
        let population = currentCity.get("population");
        rating[name] = {'population': population, 'rating': index+1};
    },0);
    return (text) => {
        Object.keys(rating).reduce((previousValue, currentValue, currentIndex, array) => {
            text = text.replaceAll(currentValue,currentValue + " (" + (currentIndex+1) +
                " место в ТОП-10 самых крупных городов Украины, население " + rating[currentValue].population + " человек)");
        },0);
        return text;
    };
}
console.log(parseCSV(data)(originData));
