package com.artezio.mts.controller;

import com.artezio.mts.dao.UserDAO;
import com.artezio.mts.dao.impl.UserDAOImpl;
import com.artezio.mts.model.User;
import junit.framework.Assert;
import junit.framework.TestCase;

import java.util.Date;
import java.util.List;

/**
 * Тесты
 *
 * Created by araigorodskiy on 13.06.2017.
 */
public class UserRestControllerTest extends TestCase {
    UserDAO dao = UserDAOImpl.getInstance();

    /**
     * Тест получения записи
     *
     * @throws Exception
     */
    public void testGetById() throws Exception {
        String login = "test1";
        User user = new User(){{
            setLogin(login);
            setPassword(login);
        }};
        dao.add(user);
        User byId = dao.getById(login);
        Assert.assertNotNull("Запись должна быть",byId);
    }

    /**
     * Тест полученния всех записей.
     *
     * @throws Exception
     */
    public void testGetAll() throws Exception {
        List<User> users = dao.getAll();
        Assert.assertNotNull(users);
    }

    /**
     * Тест удаления
     *
     * @throws Exception
     */
    public void testDeleteById() throws Exception {
        String login = "test2";
        User user = new User(){{
            setLogin(login);
            setPassword(login);
        }};
        dao.add(user);
        User byId = dao.getById(login);
        Assert.assertNotNull(byId);
        dao.delete(login);
        User byId1 = dao.getById(login);
        Assert.assertNull("Записи не должно быть", byId1);
    }

    /**
     * Тест создания записи
     *
     * @throws Exception
     */
    public void testCreate() throws Exception {
        String login = "test3";
        User user = new User(){{
            setLogin(login);
            setPassword(login);
        }};
        dao.add(user);
        User byId = dao.getById(login);
        Assert.assertNotNull("Запись должна быть создана", byId);
        Assert.assertEquals("Логин должен совпадать", login, byId.getLogin());
    }

    /**
     * Тест обновления записи
     *
     * @throws Exception
     */
    public void testUpdate() throws Exception {
        String login = "test4";
        User user = new User(){{
            setLogin(login);
            setPassword(login);
        }};
        dao.add(user);
        User byId = dao.getById(login);
        Assert.assertNull("Поле не должно быть заполнено", byId.getBirthday());
        byId.setBirthday(new Date());
        dao.update(byId);
        User secondById = dao.getById(login);
        Assert.assertNotNull("Поле должно быть заполнено", secondById.getBirthday());
    }

}