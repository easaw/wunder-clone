module ApplicationHelper
  
  def auth_token
    <<-HTML.html_safe
      <input
        type="hidden"
        name="authenticity_token"
        value="#{form_authenticity_token}">
    HTML
  end
  
  def form_errors
    return unless flash[:errors]
    html = ""
    flash[:errors].each do |error|
      html += error + "<br>"
    end
    
    html.html_safe
  end
  
end
