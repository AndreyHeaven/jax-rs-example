package com.artezio.mts.model;

import javax.ws.rs.ext.ParamConverter;
import java.util.Date;

/**
 * Created by araigorodskiy on 09.06.2017.
 */
public class DateParamConverter implements ParamConverter<Date> {
    public Date fromString(String s) {
        return new Date(Long.parseLong(s));
    }

    public String toString(Date date) {
        return Long.toString(date.getTime());
    }
}
