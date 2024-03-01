## Схема базы данных приложения

![schemadb](purchased_product_schema_db.png)

## Диаграммы классов

<details>
<summary>Модуля</summary>

### Диаграмма классов модуля prisma

![schemadb](out/src/prisma/prisma/prisma.png)

### Диаграмма классов модуля auth

![auth_module](out/src/auth/auth/auth.png)

### Диаграмма классов модуля user

![user_module](out/src/user/user/user.png)

### Диаграмма классов модуля measurement-unit

![measurement_unit](out/src/measurement-unit/measurement-unit/MeasurementUnit.png)

### Диаграмма классов модуля product

![product](out/src/product/product/product.png)

### Диаграмма классов модуля purchased-product

![purchased_product](out/src/purchased-product/purchased_product/purchased_product.png)

</details>

## Диаграммы операций

<details>
<summary>подробнее</summary>

#### Заинтересованные стороны

1. Пользователь - чтобы отслеживать свои траты

### Зарегистрироваться

#### Пред.условия:

#### Пост.условия:

1. Пользователь зарегистрирован

![register](/src/diagrams_operations/diagrams_operations_img/register.png)

### Войти в систему

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Пользовател вошел в систему

![login](/src/diagrams_operations/diagrams_operations_img/login.png)

### Добавить новую категорию

#### Пред.условия:

1. Пользователь зарегистрирован
2. Добавляемой категории нет в системе

#### Пост.условия:

1. Добавлена новая категория

![add_category](/src/diagrams_operations/diagrams_operations_img/add_category.png)

### Добавить новую единицу измерения

#### Пред.условия:

1. Пользователь зарегистрирован
2. Добавляемой еденицы измерения нет в системе

#### Пост.условия:

1. Добавлена новая единица измерения

![add_measurement_unit](/src/diagrams_operations/diagrams_operations_img/add_measurement_unit.png)

### Добавить новый продукт

#### Пред.условия:

1. Пользователь зарегистрирован
2. Добавляемого продукта нет в системе

#### Пост.условия:

1. Добавлен новый продукт

![add_product](/src/diagrams_operations/diagrams_operations_img/add_product.png)

### Добавить запись о купленном продукте

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Добавлена запись о купленном продукте

![add_purchased_product](/src/diagrams_operations/diagrams_operations_img/add_purchased_product.png)

### Удалить категорию

#### Пред.условия:

1. Пользователь зарегистрирован
2. Нет добавленных продуктов для выбранной категории
3. Пользователь является администратором

#### Пост.условия:

1. Категория удалена

![delete_category](/src/diagrams_operations/diagrams_operations_img/delete_category.png)

### Удалить единицу измерения

#### Пред.условия:

1. Пользователь зарегистрирован
2. Нет добавленных продуктов для выбранной единицы измерения
3. Пользователь является администратором

#### Пост.условия:

1. Еденица измерения удалена

![delete_measurement_unit](/src/diagrams_operations/diagrams_operations_img/delete_measurement_unit.png)

### Удалить продукт

#### Пред.условия:

1. Пользователь зарегистрирован
2. Нет записей о добавленных продуктах для удаляемого продукта
3. Пользователь является администратором

#### Пост.условия:

1. Продукт удален

![delete_product](/src/diagrams_operations/diagrams_operations_img/delete_product.png)

### Удалить купленный продукт

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Купленный продукт удален

![delete_purchased_product](/src/diagrams_operations/diagrams_operations_img/delete_purchased_product.png)

### Редактирование категории

#### Пред.условия:

1. Пользователь зарегистрирован
2. Категория существует

#### Пост.условия:

1. Категория отредактирована

![edit_category](/src/diagrams_operations/diagrams_operations_img/edit_category.png)

### Редактирование продукта

#### Пред.условия:

1. Пользователь зарегистрирован
2. Продукт существует
3. Пользователь является администратором

#### Пост.условия:

1. Продукт отредактирован

![edit_product](/src/diagrams_operations/diagrams_operations_img/edit_product.png)

### Редактирование купленного продукта

#### Пред.условия:

1. Пользователь зарегистрирован
2. Продукт существует
3. Пользователь редактирует свой купленный продукт

#### Пост.условия:

1. Купленный продукт отредактирован

![edit_purchased_product](/src/diagrams_operations/diagrams_operations_img/edit_purchased_product.png)

### Получить список категорий

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Список категорий

![get_categories](/src/diagrams_operations/diagrams_operations_img/get_categories.png)

### Получить список едениц измерения

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Список едениц измерения

![get_measurement_units](/src/diagrams_operations/diagrams_operations_img/get_measurement_units.png)

### Получить список продуктов

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Список продуктов

![get_products](/src/diagrams_operations/diagrams_operations_img/get_products.png)

### Получить список купленных продуктов в выбранную дату

#### Пред.условия:

1. Пользователь зарегистрирован

#### Пост.условия:

1. Список купленных продуктов в выбранную дату

![get_purchased_products_by_date](/src/diagrams_operations/diagrams_operations_img/get_purchased_products_by_date.png)

</details>

## Установка

```bash
$ npm install
```

## Запуск приложения

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
