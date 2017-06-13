package com.artezio.mts.model;

import javax.ws.rs.ext.ParamConverter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Дата конвертер
 *
 * @author  araigorodskiy
 */
public class DateParamConverter implements ParamConverter<Date> {
    private final static SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("dd.MM.yyyy");
    public Date fromString(String s) {
        try {
            return SIMPLE_DATE_FORMAT.parse(s);
        } catch (ParseException e) {
            return null;
        }
    }

    public String toString(Date date) {
        return SIMPLE_DATE_FORMAT.format(date);
    }
}
