# -*- coding: utf-8 -*-

{
    'name': 'Odoo 15,14,13 Customize OEM(Boost, Data reset)',
    'version': '14.22.02.25',
    'author': 'Sunpop.cn',
    'category': 'Productivity',
    'website': 'https://www.oneshare.com.cn',
    'license': 'LGPL-3',
    'sequence': 2,
    'summary': """
    1 click customize odoo, reset data. For quick develop. Set brand, boost, reset data, debug. Language Switcher. 
    Easy Delete data.reset account chart.
    customize my odoo. odoo customize, odoo oem.
    """,
    'description': """

    App Customize Odoo (Change Title,Language,Documentation,Quick Debug)
    ============
    White label odoo.
    Support Odoo 15,14, 13, 12, 11, 10, 9.
    You can config odoo, make it look like your own platform.
    1. Deletes Odoo label in footer
    2. Replaces "Odoo" in Windows title
    3. Customize Documentation, Support, About links and title in usermenu
    4. Adds "Developer mode" link to the top right-hand User Menu.
    5. Adds Quick Language Switcher to the top right-hand User Menu.
    6. Adds Country flags  to the top right-hand User Menu.
    7. Adds English and Chinese user documentation access to the top right-hand User Menu.
    8. Adds developer documentation access to the top right-hand User Menu.
    9. Customize "My odoo.com account" button
    10. Standalone setting panel, easy to setup.
    11. Provide 236 country flags.
    12. Multi-language Support.
    13. Change Powered by Odoo in login screen.(Please change '../views/app_odoo_customize_view.xml' #15)
    14. Quick delete test data in Apps: Sales/POS/Purchase/MRP/Inventory/Accounting/Project/Message/Workflow etc.
    15. Reset All the Sequence to beginning of 1: SO/PO/MO/Invoice...
    16. Fix odoo reload module translation bug while enable english language
    17. Stop Odoo Auto Subscribe(Moved to app_odoo_boost)
    18. Show/Hide Author and Website in Apps Dashboard
    19. One Click to clear all data (Sometime pls click twice)
    20. Show quick upgrade in app dashboard, click to show module info not go to odoo.com
    21. Can clear and reset account chart. Be cautious
    22. Update online manual and developer document to odoo12
    23. Add reset or clear website blog data
    24. Customize Odoo Native Module(eg. Enterprise) Url
    25. Add remove expense data
    26. Add multi uninstall modules
    27. Add odoo boost modules link.
    28. Easy Menu manager.
    29. Apps version compare. Add Install version in App list. Add Local updatable filter in app list.
    30. 1 key export app translate file like .po file.
    31. Show or hide odoo Referral in the top menu.
    32. Fix odoo bug of complete name bug of product category and stock location..
    33. Add Demo Ribbon Setting.
    34. Add Remove all quality data.
    35. Fixed for odoo 14.
    36. Add refresh translate for multi module.
    37. Easy noupdate manage for External Identifiers(xml_id)
    38. Add Draggable Dialog enable.

    This module can help to white label the Odoo.
    Also helpful for training and support for your odoo end-user.
    The user can get the help document just by one click.
    ## ?????????odoo?????????????????????????????????odoo??????????????????????????????odoo
    ??????????????????????????? odoo ???????????? odoo ?????????????????????????????????
    ??????Odoo 15,14,13,12, 11, 10, 9 ?????????????????????????????????    
    1. ??????????????????????????? Odoo ??????
    2. ?????????????????? "Odoo" ????????????????????????
    3. ??????????????????????????? Documentation, Support, About ?????????
    4. ????????????????????????????????????????????????
    5. ????????????????????????????????????????????????
    6. ????????????????????????????????????????????????
    7. ???????????????????????????/????????????????????????????????????????????????
    8. ?????????????????????????????????????????????python?????????jquery?????????Jinja2?????????PostgresSQL??????
    9. ???????????????????????????"My odoo.com account"
    10. ???????????????????????????????????????????????????
    11. ??????236???????????????????????????????????????????????????????????????
    12. ???????????????
    13. ??????????????????????????? Powered by Odoo
    14. ??????????????????????????????????????????????????????/POS??????/??????/??????/??????/??????/??????/?????????????????????.
    15. ????????????????????????????????????1??????????????????SO/PO/MO/Invoice ???
    16. ??????odoo???????????????????????????????????????Bug
    17. ?????????odoo????????????????????????????????????????????????2??????bug?????????????????????
    18. ??????/??????????????????????????????-????????????????????????
    19. ??????????????????????????????????????????????????????????????????2??????
    20. ?????????????????????????????????????????????????????????????????? odoo.com
    21. ??????????????????????????????
    22. ???????????????odoo12????????????????????????????????????????????????????????????????????????
    23. ??????????????????????????????
    24. ????????? odoo ?????????????????????url(?????????????????????)
    25. ????????????????????????????????????
    26. ??????????????????????????????
    27. ??????odoo????????????
    28. ????????????????????????
    29. App???????????????????????????????????????????????????
    30. ???????????????????????? po
    31. ??????????????? odoo ??????
    32. ??????????????????????????????????????? 
    33. ?????? Demo ??????????????? 
    34. ???????????????????????? 
    35. ?????????odoo14?????? 
    36. ???????????????????????????????????? 
    37. noupdate???????????????????????????????????? xml_id 
    38. ?????????????????? 
    """,
    'images': ['static/description/banner.gif'],
    'depends': [
        'base_setup',
        'web',
        'mail',
        'iap',
        # 'digest',
        # when enterprise
        # 'web_mobile'
    ],
    'data': [
        'security/res_groups.xml',
        'security/ir.model.access.csv',
        'views/app_odoo_customize_views.xml',
        'views/app_theme_config_settings_views.xml',
        'views/res_config_settings_views.xml',
        'views/ir_views.xml',
        'views/ir_module_module_views.xml',
        'views/ir_translation_views.xml',
        'views/ir_ui_menu_views.xml',
        'views/ir_ui_view_views.xml',
        'views/ir_model_fields_views.xml',
        'views/ir_model_data_views.xml',
        # data
        'data/ir_config_parameter_data.xml',
        'data/ir_module_module_data.xml',
        # 'data/digest_template_data.xml',
        'data/res_company_data.xml',
    ],
    'qweb': [
        'static/src/xml/*.xml',
    ],
    'demo': [],
    'test': [],
    'css': [],
    'js': [],
    # 'pre_init_hook': 'pre_init_hook',
    # 'post_init_hook': 'post_init_hook',
    'installable': True,
    'application': True,
    'auto_install': True,
}
