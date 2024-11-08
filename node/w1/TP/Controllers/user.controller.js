import User from "../Repositories/user.repository.js";
import Company from "../Repositories/company.repository.js";
import Menu from "../Repositories/menu.repository.js";

export const getCompany = async (req, res) => {
    try {
        const user = await User.find(req.userId);

        const company = await Company.find(user.company_id);
        if (! company)
            throw new Error("Not found !");
        
  
        return res.status(200).json({
            status: 'OK',
            company_details: company,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'KO',
            err: error.message
        });
    }
  };

  export const editCompany = async (req, res) => {
    try {
        const user = await User.find(req.userId);

        const company = await Company.find(user.company_id);
        if (! company)
            throw new Error("Not found !");

        const data = { ...req.body };
        const forbidden_properties = ['id', 'type', 'created_at', 'updated_at', 'deleted_at'];
        forbidden_properties.forEach(p => {
            if (data.hasOwnProperty(p))
                delete data[p];
        });
        if (! Object.keys(data).length)
            return res.status(400).json({
                status: 'KO',
                err: 'Invalid dataset'
            });
    
        const before = await Company.find(user.company_id);
        await Company.edit(user.company_id, data);
        const after = await Company.find(user.company_id);
        
        return res.status(200).json({
            status: 'OK',
            message: "Company edited successfully !",
            before: before,
            after: after
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'KO',
            err: error.message
        });
    }
  };

  export const getMenus = async (req, res) => {
      try {
        const user = await User.find(req.userId);
  
        const menus = await Menu.findByCompany(user.company_id);
        if (! menus || ! menus.length)
          throw new Error("Not found !");
          
        const parent_menu = await Menu.findOneBy(`company_id = ${(await Company.findOneBy(`type = 'parent'`)).id}`);
        if (parent_menu.content.length) {
            menus.forEach(menu => {
                if (menu.id !== parent_menu.id) {
                    menu.content.unshift(...parent_menu.content);
                }
            });
        }
    
        return res.status(200).json({
            status: 'OK',
            menus: menus,
        });
      }
      catch (error) {
          return res.status(400).json({
              status: 'KO',
              err: error.message
          });
      }
    };

    
  export const editMenu = async (req, res) => {
        try {
            const user = await User.find(req.userId);

            const menu = await Menu.find(req.params.id); const before = structuredClone(menu);
            if (! menu)
                throw new Error("Not found !");
            if (menu.company_id !== user.company_id)
                return res.status(401).json({
                    status: 'KO',
                    err: 'Unauthorized !'
                });

            const data = { ...req.body };
            const forbidden_properties = ['id', 'content', 'created_at', 'updated_at', 'deleted_at', 'company_id'];
            forbidden_properties.forEach(p => {
                if (data.hasOwnProperty(p))
                    delete data[p];
            });
            if (! Object.keys(data).length)
                return res.status(400).json({
                    status: 'KO',
                    err: 'Invalid dataset'
                });
        
            await Menu.edit(menu.id, data);
            const after = await Menu.find(req.params.id);
            
            return res.status(200).json({
                status: 'OK',
                message: "Menu edited successfully !",
                before: before,
                after: after
            });
        }
        catch (error) {
            return res.status(400).json({
                status: 'KO',
                err: error.message
            });
        }
    };

    export const addMenuItem = async (req, res) => {
        try {
            const user = await User.find(req.userId);

            const menu = await Menu.find(req.params.id); const before = structuredClone(menu);
            if (! menu)
                throw new Error("Not found !");
            if (menu.company_id !== user.company_id)
                return res.status(401).json({
                    status: 'KO',
                    err: 'Unauthorized !'
                });

            const menu_items = menu.content;
            if (menu_items.filter(i => i.name == req.body.name).length)
                return res.status(400).json({
                    status: 'KO',
                    err: `'${req.body.name}' already exists`
                });

            menu_items.push(req.body);
            await Menu.edit(req.params.id, {content: JSON.stringify(menu_items)});
            
      
            return res.status(200).json({
                status: 'OK',
                message: 'Item successfully added !',
                before: before,
                after: menu
            });
        }
        catch (error) {
            return res.status(400).json({
                status: 'KO',
                err: error.message
            });
        }
      };

      export const removeMenuItem = async (req, res) => {
          try {
              const user = await User.find(req.userId);
  
              const menu = await Menu.find(req.params.id); const before = structuredClone(menu);
              if (! menu)
                  throw new Error("Not found !");
              if (menu.company_id !== user.company_id)
                  return res.status(401).json({
                      status: 'KO',
                      err: 'Unauthorized !'
                  });
  
              const menu_items = menu.content;
              const idx = menu_items.findIndex(i => i.name == req.body.name)
              if (idx === -1)
                  return res.status(400).json({
                      status: 'KO',
                      err: `'${req.body.name}' not found`
                  });
  
              menu_items.splice(idx, 1);
              await Menu.edit(req.params.id, {content: JSON.stringify(menu_items)});
              
        
              return res.status(200).json({
                  status: 'OK',
                  message: 'Item successfully removed !',
                  before: before,
                  after: menu
              });
          }
          catch (error) {
              return res.status(400).json({
                  status: 'KO',
                  err: error.message
              });
          }
        };