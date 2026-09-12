package org.example;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class Main { public static void main(String[] args) {

    Playwright play = Playwright.create();
    Browser browser = play.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
    Page page = browser.newPage();
    String url1 = "https://www.amazon.in";
    page.navigate(url1);
    play.close();

    }
    }

