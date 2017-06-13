package com.artezio.mts.model;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.PathParam;
import java.util.Date;

/**
 * Created by araigorodskiy on 08.06.2017.
 *  модель данных для учетной записи:
 *  - Отображаемое имя
 *  - Идентификатор учетной записи (Login)
 *  - Пароль
 *  - День рождения
 *  - Пол
 */
public class User {

    @FormParam("id")
    Long id;

    @PathParam("login")
    private String login;

    @FormParam("displayName")
    private String displayName;

    @FormParam("password")
    private String password;

    @FormParam("birthday")
    private Date birthday;

    /**
     * true == male
     */
    @FormParam("gender")
    private Boolean gender = Boolean.FALSE;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }
}
