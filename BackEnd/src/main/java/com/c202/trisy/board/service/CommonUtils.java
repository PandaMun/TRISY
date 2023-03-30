package com.c202.trisy.board.service;

public class CommonUtils {

    private static final String CATEGORY_PREFIX = "/";
    private static final String TIME_SEPARATOR = "_";

    private static final String FILE_EXTENSION_SEPARATOR = ".";

    public static String buildFileName(String originalFileName) {
        int fileExtensionIndex = originalFileName.lastIndexOf(FILE_EXTENSION_SEPARATOR);
        String fileExtension = originalFileName.substring(fileExtensionIndex);
        String fileName = originalFileName.substring(0, fileExtensionIndex);
        String now = String.valueOf(System.currentTimeMillis());

        return fileName + TIME_SEPARATOR + now + fileExtension;
    }
}
