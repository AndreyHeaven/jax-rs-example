package com.artezio.mts.controller;

import com.artezio.mts.dao.UserDAO;
import com.artezio.mts.model.User;
import junit.framework.Assert;
import junit.framework.TestCase;

import java.util.List;

/**
 * Created by araigorodskiy on 13.06.2017.
 */
public class UserRestControllerTest extends TestCase {
    UserDAO dao = UserDAO.getInstance();

    public void testGetById() throws Exception {
    }

    public void testGetAll() throws Exception {
        List<User> users = dao.getAll();
        Assert.assertNotNull(users);
        Assert.assertEquals(2, users.size());
    }

    public void testDeleteById() throws Exception {
        String test1 = "test1";
        User user = new User(){{
            setLogin(test1);
            setPassword(test1);
        }};
        dao.add(user);
        User byId = dao.getById(test1);
        Assert.assertNotNull(byId);
        dao.delete(test1);
        User byId1 = dao.getById(test1);
        Assert.assertNull(byId1);
    }

    public void testCreate() throws Exception {
    }

    public void testUpdate() throws Exception {
    }

}