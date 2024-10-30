package edu.miu.cs545.lab01.helper;

import java.util.HashMap;
import java.util.Map;

public class FilterParser {
    public static Map<String, String> parseFilter(String filter) {
        Map<String, String> filtersMap = new HashMap<>();

        if (filter == null || filter.isEmpty()) {
            return filtersMap;
        }

        // Tách các điều kiện theo dấu '|'
        String[] conditions = filter.split("\\|");

        for (String condition : conditions) {
            // Tách key và value theo dấu '::'
            String[] keyValue = condition.split("::");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                filtersMap.put(key, value);
            }
        }

        return filtersMap;
    }
}
